import fs from "fs"
import path from "path"
import yaml from "js-yaml"
import { merge } from "lodash" // Install lodash for deep merging

const env = process.env.NODE_ENV || "development"

// Paths to the default and environment-specific YAML files
const defaultConfigPath = path.resolve(__dirname, "default.yaml")
const envConfigPath = path.resolve(__dirname, `${env}.yaml`)

let config: Record<string, any> = {}

try {
  // Load the default configuration
  const defaultFileContents = fs.readFileSync(defaultConfigPath, "utf8")
  const defaultConfig = yaml.load(defaultFileContents) as Record<string, any>

  // Load the environment-specific configuration (if it exists)
  let envConfig: Record<string, any> = {}
  if (fs.existsSync(envConfigPath)) {
    const envFileContents = fs.readFileSync(envConfigPath, "utf8")
    envConfig = yaml.load(envFileContents) as Record<string, any>
  }

  // Merge the default configuration with the environment-specific configuration
  config = merge(defaultConfig, envConfig)
} catch (error) {
  console.error(`Failed to load configuration for environment: ${env}`, error)
}

export default config