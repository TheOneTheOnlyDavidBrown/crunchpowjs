Feature: Binding

  Background:
    Given I visit Index

  Scenario: I update the routes
    When I update the route to "/users"
    Then I should have a url that contains "/users"
    And liaison-view should have "userindex.html user index page" in the content
    When I update the route to "/user/123"
    Then I should have a url that contains "/user/123"
    And liaison-view should have "user.html user page" in the content
    When I update the route to "/user/123/321"
    Then I should have a url that contains "/user/123/321"
    And liaison-view should have "usersub.html user sub" in the content
    When I update the route to "/list"
    Then I should have a url that contains "/list"
    And liaison-view should have "list.html if you can see this, the template loaded!" in the content

  Scenario: I update the route to one that doesnt exist
    When I update the route to "/does/not/exist"
    Then I should have a url that contains "/does/not/exist"
    And liaison-view should have "404 not found error message" in the content

  Scenario: I go back from a route that doesnt exist
    When I update the route to "/users"
    When I update the route to "/does/not/exist"
    Then I should have a url that contains "/does/not/exist"
    Then I go back a page
    Then I should have a url that contains "/users"
