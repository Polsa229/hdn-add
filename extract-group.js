// function extractContacts ()
// {
//     // let contacts = [];
//     // document.querySelectorAll( '._3m_Xw' ).forEach( element =>
//     // {
//     //     let name = element.querySelector( '._3q9s6' )?.innerText;
//     //     if ( name )
//     //     {
//     //         contacts.push( name );
//     //     }
//     // } );
    
//     // console.log( "Contacts: ", contacts );

//     // return contacts;

//     const element = document.querySelector( 'div.x78zum5.x1cy8zhl.xisnujt.x1nxh6w3.xcgms0a.x16cd2qt span.x1iyjqo2.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft._ao3e' );
//     // const element = document.querySelector( 'span.x1iyjqo2 x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1rg5ohu _ao3e' );
//     // console.log( 'element: ', element );
//     if ( !element )
//     {
//         return [];
//     }

//     const contactsText = element.textContent;
//     if ( !contactsText )
//     {
//         return [];
//     }

//     // console.log( 'ContactsText: ', contactsText );
//     const contacts = contactsText.split( ', ' );
//     console.log( 'Contacts:', contacts );
//     return contacts;
// }
function extractContacts ()
{
    const elementNom = document.querySelector( 'div._amif div._amig span.x1iyjqo2.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft.x1rg5ohu._ao3e' );
    const element = document.querySelector( 'div.x78zum5.x1cy8zhl.xisnujt.x1nxh6w3.xcgms0a.x16cd2qt span.x1iyjqo2.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft._ao3e' );
    // console.log( 'elementNom: ', elementNom );
    if ( !element )
    {
        return [];
    }

    const nomGroup = elementNom.textContent;
    const contactsText = element.textContent;
    if ( !contactsText )
    {
        return [];
    }

    const contacts = contactsText.split( ', ' );

    console.log( 'Contacts: ', contacts );
    console.log( 'Nom: ', nomGroup );

    return contacts;
}