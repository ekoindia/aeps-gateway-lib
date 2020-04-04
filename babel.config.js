module.exports = {
  presets: [
    ["@babel/env"],
    ["minify", {
	  "keepFnName": true,
	  "removeConsole": {
		  "exclude": ["error", "warn"]
	  },
	  "removeDebugger": true
    }]
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties"]
  ]
};