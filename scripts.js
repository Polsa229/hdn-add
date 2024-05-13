
function checkPhoneNumber ( phoneNumber )
{
    try
    {
        var validationNumber = isValidPhoneNumber( phoneNumber );

        // console.log(
        //     "Le numéro de téléphone formatté est  : " + numberFormatted
        // );
        console.log(
            "La validation du numéro de téléphone est  : " + validationNumber
        );

        return validationNumber;
    } catch ( error )
    {
        return null;
    }
}

function isValidPhoneNumber ( phoneNumber )
{
    try
    {
        var parsedNumber = libphonenumber.parsePhoneNumber( phoneNumber );

        var phoneNumberObj = {
            country: parsedNumber.country,
            phone: parsedNumber.nationalNumber,
        };

        return libphonenumber.isValidNumber( phoneNumberObj );
    } catch ( error )
    {
        console.error( 'Erreur lors de la vérification du numero. Erreur: ', error );
        return false;
    }
}


function exportToExcel ( data, nom )
{
    const worksheet = XLSX.utils.json_to_sheet( data );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet( workbook, worksheet, "Contacts" );
    const excelBuffer = XLSX.write( workbook, { bookType: 'xlsx', type: 'array' } );
    saveAsExcelFile( excelBuffer, nom + ".xlsx" );
}

function saveAsExcelFile ( buffer, fileName )
{
    const data = new Blob( [ buffer ], { type: 'application/octet-stream' } );
    const url = window.URL.createObjectURL( data );
    const a = document.createElement( 'a' );
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout( () =>
    {
        window.URL.revokeObjectURL( url );
    }, 0 );
}


document.addEventListener( 'DOMContentLoaded', () =>
{
    var form_submit_contact = document.querySelector( '#form-submit-numbers' )
    form_submit_contact.addEventListener( "submit", ( e ) =>
    {
        e.preventDefault();
        console.log( "Formulaire soumis" );

        var nom = document.querySelector( '#nom' );
        var contact = document.querySelector( '#contacts' );

        if ( nom.value != "" && contact.value != "" )
        {
            contact.value = contact.value.trim();
            var contacts = contact.value.split( ', ' );
            // console.log( "contacts: ", contacts );

            var contacts_valides = [];
            for ( let i = 0; i < contacts.length; i++ )
            {
                let element = contacts[ i ].replace( /\s/g, '' );

                var verifyNumber = checkPhoneNumber( element );

                if ( verifyNumber )
                {
                    contacts_valides.push( { Parents: `${ i }-contact ` + nom.value, Code: element } )
                }
            }


            // Maintenant, vous pouvez utiliser contacts_valides comme nécessaire (envoyer à un serveur, etc.)
            // console.log( "Contacts valides: ", contacts_valides );
            document.querySelector( '.title' ).innerHTML = `Contacts: ${ contacts_valides.length }`
            if ( contacts_valides.length > 0 )
            {
                exportToExcel( contacts_valides, nom.value );
                // Réinitialiser le formulaire 
                form_submit_contact.reset();
            } else
            {
                // console.log( "Aucun contact valide à exporter." );
                console.error( "Aucun contact valide à exporter." );
            }
        }
    } )
} );
