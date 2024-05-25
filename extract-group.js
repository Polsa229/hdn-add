
function checkPhoneNumber ( contact )
{
    const phoneRegex = /^\+\d{1,3}\s*\d{1,14}(\s*\d{1,13})?$/;

    return phoneRegex.test( contact );
}



function saveAsExcelFile ( buffer, fileName )
{
    const data = new Blob( [ buffer ], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" } );
    const link = document.createElement( 'a' );
    link.href = window.URL.createObjectURL( data );
    link.download = fileName;
    link.click();
}


function extractContacts ()
{
    var contacts_valides = [];
    var nomGroup = "";
    const elementNom = document.querySelector( 'div._amif div._amig span.x1iyjqo2.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft.x1rg5ohu._ao3e' );
    const element = document.querySelector( 'div.x78zum5.x1cy8zhl.xisnujt.x1nxh6w3.xcgms0a.x16cd2qt span.x1iyjqo2.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft._ao3e' );

    var contacts_valides = [];
    if ( element )
    {
        nomGroup = elementNom && ( elementNom.textContent );
        const contactsText = element.textContent;
        if ( contactsText )
        {
            const contacts = contactsText.split( ', ' );
            // console.log( 'Contacts: ', contacts );
            for ( let i = 0; i < contacts.length; i++ )
            {
                let contact = contacts[ i ].replace( /\s+/g, '' );
                var verifyNumber = checkPhoneNumber( contact );
                if ( verifyNumber )
                {
                    contacts_valides.push( { nom: `${ contacts_valides.length + 1 }-contact ${ nomGroup }`, numero: contact.replace( /\s+/g, '' ) } );
                }
            }
        }
    }

    // console.log( 'Contacts valide: ', contacts_valides );
    console.log( 'Contacts récupérés !' );
    // console.log( 'Nom: ', nomGroup );
    console.log( 'Nom récupéré !' );

    return { contacts_valides, nomGroup };
}
