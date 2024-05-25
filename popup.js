console.log( 'popup.js loaded' );

document.addEventListener( 'DOMContentLoaded', () =>
{
    console.log( 'DOM fully loaded and parsed' );
    const extractButton = document.getElementById( 'extract' );
    if ( extractButton )
    {
        extractButton.addEventListener( 'click', () =>
        {

            try
            {
                extractButton.disabled = true;
                const contentExtractButton = extractButton.textContent;
                console.log( "contentExtractButton: ", contentExtractButton );
                extractButton.innerText = "Chargement...";

                chrome.tabs.query( { active: true, currentWindow: true }, ( tabs ) =>
                {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs[ 0 ].id },
                            function: startExtractingContacts
                        },
                        ( results ) =>
                        {
                            if ( results && results[ 0 ] && results[ 0 ].result )
                            {
                                const { contacts_valides, nomGroup } = results[ 0 ].result;
                                if ( contacts_valides.length == 0 )
                                {
                                    document.getElementById( 'result' ).textContent = "Aucun contact n'a été trouvé.";
                                } else
                                {
                                    // generateVCard( contacts )
                                    // document.getElementById( 'result' ).textContent = contacts_valides.map( contact => `${ contact.Parents }: ${ contact.Code }` ).join( '\n' );
                                    document.getElementById( 'result' ).innerHTML = `
                                        <hr />
                                        <div class="d-flex mb-1"><span><strong>Groupe:</strong> ${ nomGroup }</span></div>
                                        <div class="d-flex mb-1"><span><strong>Contact:</strong> ${ contacts_valides.length } nouveau(x) contact(s)</span></div>
                                        <div>
                                            <button id="downloadBtnVcard" class="mb-2 btn btn-sm btn-secondary">Contacts en Vcard</button>
                                            <button id="downloadBtnExcel" class="btn btn-sm btn-success">Contacts en excel</button>
                                        </div>        
                                    `;

                                    // Ajouter un gestionnaire d'événements pour le bouton de téléchargement
                                    document.getElementById( 'downloadBtnVcard' ).addEventListener( 'click', () =>
                                    {
                                        exportToVCard( contacts_valides, nomGroup.replace( /\s+/g, '_' ) );
                                    } );

                                    // Ajouter un gestionnaire d'événements pour le bouton de téléchargement
                                    document.getElementById( 'downloadBtnExcel' ).addEventListener( 'click', () =>
                                    {
                                        exportToExcel( contacts_valides, nomGroup.replace( /\s+/g, '_' ) );
                                    } );
                                }
                            } else
                            {
                                document.getElementById( 'result' ).textContent = "Aucun contact n'a été trouvé ou il y a eu une erreur.";
                            }
                        }
                    );
                } );

                setTimeout( () =>
                {
                    extractButton.disabled = false;
                    extractButton.innerText = contentExtractButton;
                }, 1000 );

            } catch ( error )
            {
                document.getElementById( 'result' ).textContent = "Aucun contact n'a été trouvé ou il y a eu une erreur.";
                console.error( "Erreur lors de l'extraction des contacts: ", error );
            }
        } );
    } else
    {
        console.error( "Bouton d'extraction introuvable." );
    }
} );

function startExtractingContacts ()
{
    return extractContacts();
}

function exportToVCard ( contacts, nom )
{
    let vCardData = '';

    // Loop through each contact
    contacts.forEach( ( contact, index ) =>
    {
        // Add contact information to vCard format
        vCardData += `BEGIN:VCARD\n`;
        vCardData += `VERSION:3.0\n`;
        vCardData += `FN:${ contact.nom }\n`;
        vCardData += `TEL;TYPE=CELL:${ contact.numero }\n`;
        vCardData += `END:VCARD\n\n`;
    } );

    const blob = new Blob( [ vCardData ], { type: 'text/vcard' } );
    const url = window.URL.createObjectURL( blob );
    const a = document.createElement( 'a' );
    a.href = url;
    a.download = `contacts-${ nom }.vcf`;
    document.body.appendChild( a );
    a.click();
    document.body.removeChild( a );
    window.URL.revokeObjectURL( url );
}

function exportToExcel ( contacts, nom )
{
    // Créer le contenu HTML pour le fichier Excel
    let excelContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="utf-8"></head>
        <body>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Numéro</th>
                    </tr>
                </thead>
                <tbody>
    `;
    contacts.forEach( contact =>
    {
        excelContent += `
            <tr>
                <td>${ contact.nom }</td>
                <td>${ contact.numero }</td>
            </tr>
        `;
    } );
    excelContent += `
                </tbody>
            </table>
        </body>
        </html>
    `;

    // Créer le blob à partir du contenu HTML
    const blob = new Blob( [ excelContent ], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' } );

    // Créer un lien de téléchargement pour le blob
    const a = document.createElement( 'a' );
    const url = window.URL.createObjectURL( blob );
    a.href = url;
    a.download = `contacts-${ nom }.xlsx`; // Nom du fichier Excel
    document.body.appendChild( a );
    a.click();

    // Nettoyer
    window.URL.revokeObjectURL( url );
    document.body.removeChild( a );
}
