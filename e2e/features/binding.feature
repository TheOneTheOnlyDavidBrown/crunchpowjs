Feature: Binding

  Background:
    Given I visit Index

  Scenario: Entering Single Level Data
    Then I should see "some text" in the data bound field for "single"
    When I update "single" input to "new text"
    Then I should see "new text" in the data bound field for "single"

  Scenario: Entering Nested Data
    When I update "user.address" input to "221b london"
    Then I should see "221b london" in the data bound field for "user.address"
    When I update "user.address" input to "221b baker st"
    Then I should see "221b baker st" in the data bound field for "user.address"

  Scenario: Entering Empty Data
    When I update "user.address" input to ""
    Then I should see "" in the data bound field for "user.address"
    When I update "user.address" input to "221b baker st"
    Then I should see "221b baker st" in the data bound field for "user.address"
    When I update "single" input to ""
    Then I should see "" in the data bound field for "single"
