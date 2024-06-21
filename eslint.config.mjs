import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser, // Keep existing browser globals
                ...globals.node // Add Node.js globals
            },
            ecmaVersion: 12 // Ensure ECMAScript version is set
        }
    },
    pluginJs.configs.recommended,
];