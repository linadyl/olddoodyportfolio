module.exports = {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            
            removeDimensions: true,
            
            cleanupNumericValues: {
              floatPrecision: 2
            },
            
            convertPathData: true,
            
            collapseGroups: true,
            
            cleanupIDs: true
          }
        }
      }
    ]
  };