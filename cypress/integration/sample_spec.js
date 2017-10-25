describe('Stuff', function() {
  it('should do stuff', function() {
    cy.visit('http://www.test.bbc.co.uk/sport/football/scores-fixtures/2017-10-09');

    cy.get('input[name="search"]').type('Manchester City{downarrow}');
    cy.get('#search-result-0').click();
    cy.contains('Manchester City Scores & Fixtures');
  });
});
