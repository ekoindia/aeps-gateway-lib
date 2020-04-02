module.exports = {
  presets: [
    ["@babel/env"],
    ["minify", {
	  "keepFnName": true,
	  "removeConsole": true,
	  "removeDebugger": true
    }]
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties"]
  ]
};