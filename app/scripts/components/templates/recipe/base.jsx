var React = require('react');
var Base = require('../base.jsx').BaseLayout;

/**
 * Base layout for the recipe app
 * Usage:
 *  <RecipeLayout left={<Left />} right={<Right />} />
 */
function RecipeLayout(props){
  return (
    <Base>
      <div className="col-md-3">
        {props.left}
      </div>

      <div className="col-md-9">
        {props.right}
      </div>
    </Base>
  )
}

module.exports = RecipeLayout;
