module.exports = function() {
  this.Given(/^I visit Index/, function() {
    this.driver.get('http://localhost:9000/#/')
  });

  this.Then(/^I should see "([^"]*)" in the data bound field for "([^"]*)"$/, function(expected, field) {
    // express the regexp above with the code you wish you had
    return this.Widget.read({
      selector: 'div[liaison-bind="' + field + '"]'
    }).should.eventually.eql(expected);
  });

  this.When(/^I update "([^"]*)" input to "([^"]*)"$/, function(field, value) {
    // express the regexp above with the code you wish you had
    this.Widget.fill({
      selector: "input[liaison-bind='" + field + "']",
      value: [""]
    });
    new this.Widget({
      root: "input[liaison-bind='" + field + "']",
      value: ['', '\uE007']
    }).sendKeys(value, '\uE007');
  });
}
