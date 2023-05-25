import { StyleSheet } from 'react-native';



const LogincreenCss = StyleSheet.create({
  container4:{
    flex:0.08,
    width: null,
    height: null,
    flexDirection: "row",
    justifyContent: 'center', //Centered horizontally
    alignItems: 'flex-start', //Centered vertically
  },
    input: {
      width:'80%',
      borderColor: "white",
      borderWidth: 0,
      borderRadius: 10,
      padding: 10,
      alignItems: 'flex-start',
      backgroundColor:"#fff"
    },

    button: {
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
        backgroundColor: '#5D7049',
        color:"#fff"
      },
      button2: {
        alignSelf: "baseline",
        width: '80%',
        height: "90%",
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        fontFamily: "stratos",
        borderRadius: 50,
        elevation: 5,
        backgroundColor: '#fff',
        color:"#5D7049"
      },
      container40: {
        flex: 0.35,
        flexDirection: "row",
        justifyContent: 'center'
      },
      container10: {
        justifyContent: 'center',
        flex: 0.15,
        flexDirection: "row",
      },
      container15: {
        flex: 0.15,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      container8: {
        flex: 0.08,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      container7: {
        flex: 0.08,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      container9: {
        flex: 0.09,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      texts2: {
        margin: -5,
        fontFamily: "stratos",
        alignSelf: "flex-start",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
        color: "#5AA0A7",
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
        fontWeight: '900',
        fontFamily: "stratos",
        alignSelf: "center",
        textAlign: "center",
        fontSize: 30,
        color: "#5AA0A7",
      },
      texts5: {
        fontWeight: "bold",
        fontFamily: "stratos",
        fontSize: 14,
        color: "#5D7049",
      },
      texts6: {
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

export default LogincreenCss;