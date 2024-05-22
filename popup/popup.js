function scanner ()
{

    nom_groupe_extract.innerHTML = `
        <strong>Nom Groupe:</strong>{}.
    `;

    number_membre_groupe_extract.innerHTML = `
        <strong>Membre:</strong>{}.
    `;

    btn_popup.innerText = "Extraire";
    // btn_popup.addEventListener( "click", fetchGroup );
    btn_popup.addEventListener( "mouseover", () =>
    {
        btn_popup.innerText = "Extraction en cours...";
    } );

    btn_popup.addEventListener( "click", fetchGroup );

    // Show the result section
    result_scanning_groupe.style.display = 'block';

}

document.addEventListener( 'DOMContentLoaded', function ()
{
    let result_scanning_groupe = document.querySelector( '#result_scanning_groupe' );
    let btn_popup = document.querySelector( '#btn_popup' );
    let btn_close_result_scanning = document.querySelector( '#btn_close_result_scanning' );
    let nom_groupe_extract = document.querySelector( '#nom_groupe_extract' );
    let number_membre_groupe_extract = document.querySelector( '#number_membre_groupe_extract' );

    btn_popup.addEventListener( 'click', scanner );

    btn_close_result_scanning.addEventListener( 'click', () =>
    {
        result_scanning_groupe.style.display = 'none';
        btn_popup.innerText = "Scanner";
        btn_popup.addEventListener( "click", () =>
        {
            // btn_popup.innerText = "";
        } );

        btn_popup.addEventListener( 'click', scanner );

    } );
} );