import path from "node:path"
import {fileURLToPath} from "node:url"
import js from "@eslint/js"
import {FlatCompat} from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends("plugin:vitest/legacy-all"),
  {
    rules: {
      "vitest/prefer-expect-assertions": "off",

      "vitest/no-hooks": [
        "error",
        {
          allow: ["afterEach", "afterAll", "beforeAll", "beforeEach"],
        },
      ],

      "import/named": "off",
    },
  },
]
