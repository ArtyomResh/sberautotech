// ext vars from Gitlab
local ci = {
  annotations: {
    'app.gitlab.com/app': std.extVar('path_slug'),
    'app.gitlab.com/env': std.extVar('env_slug'),
  },
  gitlab_env: std.extVar('env_slug'),
  image_path: std.extVar('image_path'),
  image_version: std.extVar('image_version'),
  ns: std.extVar('namespace'),
  registry: std.extVar('registry'),
  domain_ru: std.extVar('domain_ru'),
  domain_en: std.extVar('domain_en'),
  app_name: std.extVar('app_name')
};

// template with environmental variables
local ext_env = std.extVar('env_ext');

// Lib import
local sat = import '/jsonnet-libs/sat-k8s-libsonnet/main.libsonnet';

local env = ext_env + { domain_ru: ci.domain_ru, domain_en: ci.domain_en, app_name: ci.app_name };

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

local ingresses = [
  sat.getIngress(ci, env, ingressName).result
  for ingressName in std.objectFields(env.ingresses)
];

local configmaps = [
  sat.getConfigmap(ci, env, configmapName).result
  for configmapName in std.objectFields(env.configmaps)
];

std.manifestYamlStream(
  [ configmap for configmap in configmaps ]
  + [ deployment for deployment in deployments ]
  + [ service for service in services ]
  + [ ingress for ingress in ingresses ],
  c_document_end=false
)
