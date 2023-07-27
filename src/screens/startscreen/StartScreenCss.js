import { StyleSheet,Dimensions  } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const StartScreenCss = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F5F5',
    },
    backgroundContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    backgroundImage: {
      justifyContent:'flex-end',
      width: 4500,
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
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      container10: {
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

export default StartScreenCss;