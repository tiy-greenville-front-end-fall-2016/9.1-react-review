var React = require('react');

/**
 * Base layout for the project
 * Usage:
 *  <BaseLayout> ... </BaseLayout>
 */
function BaseLayout(props){

  return (
    <div>
      <nav className="navbar navbar-inverse" role="navigation"> {/* navbar-fixed-top */}
        <div className="container">

            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Batch Maker App</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li>
                        <a href="#recipes/">Recipes</a>
                    </li>
                    <li>
                        <a href="#recipes/add/">Add Recipe</a>
                    </li>
                    {/*<li>
                        <a href="#"></a>
                    </li>*/}
                </ul>
            </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          {props.children}
        </div>
      </div>

      <div className="container">
          <hr />
          <footer>
              <div className="row">
                  <div className="col-lg-12">
                      <p>Copyright © BatchMaker 2016 :: Maker of Batch Badassery</p>
                  </div>
              </div>
          </footer>

      </div>
    </div>
  )
}

module.exports = BaseLayout;
