Feature: Binding

  Background:
    Given I visit Index

  Scenario: I update the routes
    When I update the route to "/users"
    Then I should have a url that contains "/users"
    And liaison-view should have "userindex.html" in the content
    When I update the route to "/user/123"
    Then I should have a url that contains "/user/123"
    And liaison-view should have "user.html" in the content
    When I update the route to "/user/123/321"
    Then I should have a url that contains "/user/123/321"
    And liaison-view should have "usersub.html" in the content
    When I update the route to "/list"
    Then I should have a url that contains "/list"
    And liaison-view should have "list.html" in the content

  Scenario: I update the route to one that doesnt exist
    When I update the route to "/does/not/exist"
    Then I should have a url that contains "/404"
    And liaison-view should have "404 not found error message" in the content

