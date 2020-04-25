declare var nprocess: Process;

interface Process {
  env: Env;
}

interface Env {
  KAWULO_API_URL: string;
}

interface GloblalEnvironment {
  nprocess: Process;
}
