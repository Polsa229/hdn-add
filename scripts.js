
function checkPhoneNumber ( phoneNumber )
{
    try
    {
        var numberFormatted = getCountryFromPhoneNumber( phoneNumber ).number;

        var validationNumber = isValidPhoneNumber( numberFormatted );

        console.log(
            "Le numéro de téléphone formatté est  : " + numberFormatted
        );
        console.log(
            "La validation du numéro de téléphone est  : " + validationNumber
        );

        return { numberFormatted, validationNumber };
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
        return false;
    }
}

function getCountryFromPhoneNumber ( phoneNumber )
{
    try
    {
        var parsedNumber = libphonenumber.parsePhoneNumber( phoneNumber );
        return parsedNumber;
    } catch ( error )
    {
        return null;
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
            var contacts = contact.value.split( ',' );
            var contacts_valides = [];
            for ( let i = 0; i < contacts.length; i++ )
            {
                let element = contacts[ i ].trim();
                // var verifyNumber = checkPhoneNumber( element );

                // if ( verifyNumber )
                // {
                // }
                element = verifyNumber.numberFormatted;

                contacts_valides.push( { Parents: `${ i } ` + nom.value, Code: element } )
            }


            // Maintenant, vous pouvez utiliser contacts_valides comme nécessaire (envoyer à un serveur, etc.)
            console.log( "Contacts valides: ", contacts_valides );

            if ( contacts_valides.length > 0 )
            {
                exportToExcel( contacts_valides, nom.value );
                // Réinitialiser le formulaire 
                form_submit_contact.reset();
            } else
            {
                console.log( "Aucun contact valide à exporter." );
            }
        }
    } )
} );
