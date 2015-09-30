Feature: Binding

  Background:
    Given I visit Index

  Scenario: Entering New Data
    When I update address to "221b london"
    Then I should see "221b london" in the data bound field
