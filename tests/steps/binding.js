module.exports = function() {
  this.Given(/^I visit Index/, function() {
    this.driver.get('http://localhost:3001/#/')
  });

  this.When(/^I update address to \"([^\"]*)\"$/, function(value) {
    this.Widget.fill({
      selector: "input[liaison-bind='user.address']",
      value: [""]
    });
    new this.Widget({
      root: "input[liaison-bind='user.address']",
      value: ['', '\uE007']
    }).sendKeys(value, '\uE007');
  });

  this.Then(/^I should see \"([^\"]*)\" in the data bound field$/, function() {
    return this.Widget.read({
      selector: '#user-address'
    }).should.eventually.eql('221b london');
  })
}
