function extractContacts() {
  let contacts = [];
  document.querySelectorAll('._3m_Xw').forEach(element => {
    let name = element.querySelector('._3q9s6')?.innerText;
    if (name) {
      contacts.push(name);
    }
  });
  console.log("Contacts: ",contacts);
  return contacts;
}

// Supprimer les événements de focus


document.body.style.userSelect = "auto";
// Sélectionner tous les éléments avec la classe '.main'
var elements = document.querySelectorAll( '.main' );

// Parcourir tous les éléments et appliquer la propriété user-select: auto à chacun
elements.forEach( function ( element )
{
    element.style.userSelect = "auto";
} );


var divLoading = document.querySelector( '._alyo' );

var checkInterval = setInterval( function ()
{

    console.log( "Loading ..." );
    var input_search = document.querySelector( '.lexical-rich-text-input' );
    if ( input_search )
    {
        console.log( "Salut!!" );

        var inputs = document.querySelectorAll( ".selectable-text" );
        inputs.forEach( ( input, index ) =>
        {
            console.log( `input Avant ${ index }: `, input )
            if ( index == 0 )
            {
                // Set the dir attribute
                input.setAttribute( 'dir', 'ltr' );

                // Set the style attribute
                input.style.textIndent = '0px';
                input.style.marginTop = '0px';
                input.style.marginBottom = '0px';

                var span = document.createElement( "span" );

                span.classList.add( "selectable-text", "copyable-text" )
                span.setAttribute( "data-lexical-text", "true" );
                span.innerText = "Ola HDN";

                console.log( `Span : `, span );

                input.innerHTML = span
                // input.appendChild( span )
                // input.innerHTML = `<span class="selectable-text copyable-text" data-lexical-text="true">Ola_HDN</span>`;
                console.log( `input Après ${ index }: `, input )
            }
        } )

        input_search.focus();
        input_search.value = "Ola_HDN";
        clearInterval( checkInterval ); // Stop checking once the element is found
    }
}, 5000 ); // Check every 5000 milliseconds



