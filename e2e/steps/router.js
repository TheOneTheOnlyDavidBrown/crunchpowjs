module.exports = function() {
  this.When(/^I update the route to "([^"]*)"$/, function(value) {
    this.driver.get('http://localhost:3001/#' + value);
  });

  this.Then(/^I should have a url that contains "([^"]*)"$/, function(value) {
    return this.driver.getCurrentUrl().should.eventually.contain(value);
  });

  this.Then(/^liaison\-view should have "([^"]*)" in the content$/, function(value) {
    return this.Widget.read({
      selector: "[liaison-view]"
    }).should.eventually.eql(value)
  });

  this.Then(/^I go back a page$/, function() {
    return this.driver.executeScript("window.history.back()");
  });

}
