
console.log( 'popup.js loaded' );



document.addEventListener( 'DOMContentLoaded', () =>
{
    console.log( 'DOM fully loaded and parsed' );
    const extractButton = document.getElementById( 'extract' );
    document.getElementById( 'result' ).textContent = "";

    if ( extractButton )
    {
        extractButton.addEventListener( 'click', () =>
        {
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
                            console.log( "results[ 0 ].result: ", results[ 0 ].result )

                            document.getElementById( 'result' ).innerHTML = `
                                <p>Contacts : ${ results[ 0 ].result.lenght }</p>
                                <button id="extract">Télécharger le fichier Excel</button>
                            `;
                        } else
                        {
                            document.getElementById( 'result' ).textContent = "Aucun contact n'a été trouvé ou il y a eu une erreur.";
                        }
                    }
                );
            } );
        } );
    } else
    {
        console.error( "Bouton d'extraction introuvable." );
    }
} );

function startExtractingContacts ()
{
    return new Promise( ( resolve, reject ) =>
    {
        var checkInterval = setInterval( function ()
        {
            var input_search = document.querySelector( '.lexical-rich-text-input' );
            if ( input_search )
            {

                clearInterval( checkInterval ); // Stop checking once the element is found
                const contacts = extractContacts();

                // console.log( 'Contacts startExtractingContacts: ', contacts );

                resolve( contacts );
            } else
            {
                console.log( 'Loading...' );
            }
        }, 5000 ); // Check every 5000 milliseconds

        setTimeout( () =>
        {
            clearInterval( checkInterval ); // Clear interval after a timeout to avoid infinite loops
            reject( "Timeout waiting for input_search element." );
        }, 30000 ); // Timeout after 30 seconds

    } )
}

