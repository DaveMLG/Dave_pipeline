describe('Product owner', function () {
    before(() => {
    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.svo');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();
    });
    
    it('Odporúčenie šablón lekcie pre garanta', function () {
    // Uloží data z popisu
    let DataValues = [];
    let jsonData = {};
    
    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(5) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/lesson-template"]').click();
    cy.wait(3000)
    cy.get('[placeholder="Kľúčové slovo"]').type('Šablóna na pretestovanie úloh')
    cy.get('[type="submit"]').first().click()
    cy.get('tbody').find('a').first().click()
    cy.get(':nth-child(3) > .nav-link').click().wait(1000)
    cy.get('.table.table-hover.table-bordered.table-striped.af-table').find('tr').find('td:nth-child(4)').then((tbodyRow) => {
        for (let x = 0; x < tbodyRow.length; x++) {
            cy.wrap(tbodyRow).eq(x).invoke('text').then((dataVals) => {
                DataValues.push({instLecturer: dataVals})
              })
        }

        cy.get('.table.table-hover.table-bordered.table-striped.af-table').find('tr').find('td:nth-child(5)').then((tbodyRow) => {
            for (let x = 0; x < tbodyRow.length; x++) {
                cy.wrap(tbodyRow).eq(x).invoke('text').then((dataVals) => {
                    DataValues.push({instCorrector: dataVals})
                  })
            }
        })

            cy.get('.table.table-hover.table-bordered.table-striped.af-table').find('tr').find('td:nth-child(6)').then((tbodyRow) => {
                for (let x = 0; x < tbodyRow.length; x++) {
                    cy.wrap(tbodyRow).eq(x).invoke('text').then((dataVals) => {
                        DataValues.push({instStudent: dataVals})
                      })
                }
            })
        cy.wait(1000).then(() => {
            jsonData['Values'] = DataValues;
            cy.writeFile('cypress/fixtures/template_instructions.json', JSON.stringify(jsonData, null, 2))
          })
    })
    })
})
    