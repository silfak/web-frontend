import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  // Path to your OpenAPI specification (can be a local path or a URL)
  input: 'openapi.json', 
  // Directory where the generated client will be saved
  output: 'src/client',
  // Plugins used for code generation (using Axios HTTP client)
  plugins: [
    '@hey-api/client-axios',
  ],
});
