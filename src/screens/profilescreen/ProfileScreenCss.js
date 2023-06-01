import { StyleSheet } from 'react-native';



const ProfileScreenCss = StyleSheet.create({

    buttonStart: {
        overflow: 'hidden',
        alignSelf: "baseline",
        width: '80%',
        height: "90%",
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        fontFamily: "stratos",
        borderRadius: 50,
        elevation: 5,
        color:"#fff"
      },
      button: {
        alignSelf: 'center', // Aligns the button text to the start
        width: '80%',
        height: 48, // Adjust the height as needed
        justifyContent: 'center',
        alignItems: 'flex-start', // Aligns the button text to the start
        paddingVertical: 12,
        paddingHorizontal: 32,
        fontFamily: 'stratos',
        borderRadius: 10,
        backgroundColor:'#00000000',
        color: '#5D7049',
      },
      container40: {
        //backgroundColor: '#F5F5F5',
        flex: 0.20,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
      },
      container10: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.15,
        flexDirection: 'row',
      },
      leftImageContainer: {
        height:60,
        flex: 1,
        alignItems: 'flex-start',
      },
      leftImage: {
        height: '100%',
        aspectRatio: 1,
        resizeMode:'contain',
        marginTop:15,
        marginLeft:5,
      },
      rightImageContainer: {
        height:60,
        flex: 1,
        alignItems: 'flex-end',
      },
      rightImage: {
        aspectRatio: 1,
        borderRadius: 50,
        height:'100%',
        marginTop:15,
        marginRight:5,
        resizeMode:'contain',
        
      },
      container15: {
        //backgroundColor: '#F5F5F5',
        flex: 0.15,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      container8: {
        //backgroundColor: '#F5F5F5',
        flex: 0.08,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      container18: {
        flex: 0.30,
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      row: {
        flexDirection: 'row',
      },
      container5: {
        flex: 0.3,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
      container7: {
        //backgroundColor: '#F5F5F5',
        flex: 0.08,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      container9: {
        //backgroundColor: '#F5F5F5',
        flex: 0.09,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      texts2: {
        fontFamily: "stratos",
        alignSelf: "center",
        textAlign: "center",
        fontWeight: "800",
        fontSize: 16,
        color: "#5AA0A7",
        paddingLeft: '21%',
        paddingRight: '21%',
      },
      texts5: {
        fontFamily: "stratos",
        fontWeight: "800",
        fontSize: 16,
        color: "#233C3E",
        paddingLeft: '21%',
        paddingRight: '21%',
      },
      texts3: {
        fontWeight: "bold",
        fontFamily: "stratos",
        alignSelf: "center",
        textAlign: "center",
        fontSize: 14,
        color: "#5D7049",
      },
      texts4: {
        fontWeight: "bold",
        fontFamily: "stratos",
        alignSelf: "center",
        textAlign: "center",
        fontSize: 14,
        color: "#fff",
      },
      headerImagestyle: {
        alignSelf: "flex-start",
        marginTop: '10%',
        resizeMode: 'contain',
        paddingBottom: 0,
        width: '60%',
        height: '60%',
      }
});

export default ProfileScreenCss;