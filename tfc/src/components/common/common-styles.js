const CommonStyles = () => {

    return {
        'standard_font': {fontFamily: 'Helvetica', fontSize: '20px', fontWeight: 'bold', color: '#FFFFFF'},
        'appbar_button': {
            // background: 'linear-gradient(to bottom, #ff7700 5%, #ff3c00 100%)',
            backgroundColor: 'transparent',

            borderRadius: '28px',

            display: 'inline-block',
            cursor: 'pointer',

            color: '#000000',

            fontFamily: 'Helvetica',
            fontSize: '20px',
            fontWeight: 'bold',

            padding: '4px 16px',
            marginTop: '4px',
            marginBottom: '4px',
            marginLeft: '8px',
            marginRight: '8px',


            '&:hover': {
                // background: 'linear-gradient(to bottom, #ff3c00 5%, #ff7700 100%)',
                backgroundColor: '#ffd500',
            }
        },
        'standard_button': {
            // background: 'linear-gradient(to bottom, #ff7700 5%, #ff3c00 100%)',
            backgroundColor: '#ffa500',

            borderRadius: '28px',
            border: '1px solid #000000',

            display: 'inline-block',
            cursor: 'pointer',

            color: '#000000',

            fontFamily: 'Helvetica',
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            verticalAlign: 'middle',

            padding: '4px 16px',
            marginTop: '4px',
            marginBottom: '4px',
            marginLeft: '8px',
            marginRight: '8px',

            '&:hover': {
                // background: 'linear-gradient(to bottom, #ff3c00 5%, #ff7700 100%)',
                backgroundColor: '#ffd500',
            }
        },

        'standard_text_field': {
            fontFamily: 'Helvetica', fontSize: '20px', fontWeight: 'bold', color: '#000000',
            backgroundColor: '#ffffff',
            borderRadius: '50px',
            paddingLeft: '20px', paddingRight: '20px'
        },

        'standard_autocomplete': {
            fontSize: 15,
            backgroundColor: '#ffffff',
            color: '#000000',
            textShadow: '0px 0px 0px rgba(66,66,66,.75)',
            padding: '4px 16px',
        },

        'standard_date_picker': {
            fontSize: 15,
            borderWidth: 5,
            borderColor: '#ff6e00',
            backgroundColor: '#ffa04c',
            color: '#000000',
            borderStyle: 'groove',
            borderRadius: 8,
            padding: 0,
            boxShadow: '0px 0px 5px rgba(66,66,66,.75)',
            textShadow: '0px 0px 0px rgba(66,66,66,.75)',
        },
    };
}


export default CommonStyles;