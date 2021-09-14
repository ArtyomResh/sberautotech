// ext vars from Gitlab
local ci = {
  annotations: {
    'app.gitlab.com/app': std.extVar('path_slug'),
    'app.gitlab.com/env': std.extVar('env_slug'),
    'app.gitlab.com/jobid': std.extVar('job_id')
  },
  gitlab_env: std.extVar('env_slug'),
  image_path: std.extVar('image_path'),
  image_version: std.extVar('image_version'),
  ns: std.extVar('namespace'),
  registry: std.extVar('registry'),
};

// template with environmental variables
local env = std.extVar('env_ext');

// Linter flag
local lint = std.extVar('lint');

// Lib import
local sat = import '/jsonnet-libs/sat-k8s-libsonnet/main.libsonnet';

// Contructing k8s objects
local deployments = [
  sat.getDeployment(ci, env, deployName).result
  for deployName in std.objectFields(env.deployments)
];

local services = [
  sat.getService(ci, env, deployName, serviceName).result
  for deployName in std.objectFields(env.deployments)
  for serviceName in std.objectFields(env.deployments[deployName].expose)
];

local certificates = [
  sat.getCertificate(ci, env, domain).result
  for domain in std.objectFields(env.certificates)
];

local ingresses = [
  sat.getIngress(ci, env, ingressName).result
  for ingressName in std.objectFields(env.ingresses)
];

std.manifestYamlStream(
  (if !lint then [ certificate for certificate in certificates] else [])
  + [ deployment for deployment in deployments ]
  + [ service for service in services ]
  + [ ingress for ingress in ingresses ],
  c_document_end=false
)
