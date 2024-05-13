document.addEventListener( 'DOMContentLoaded', () =>
{
    var form_submit_contact = document.querySelector( '#form-submit-numbers' )
    form_submit_contact.addEventListener( "submit", ( e ) =>
    {
        e.preventDefault();
        console.log( "Formulaire soumis" );

        var nom = document.querySelector( '#nom' );
        var contacts = document.querySelector( '#contacts' );
        
    } )
} );
