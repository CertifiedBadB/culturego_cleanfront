import { StyleSheet } from 'react-native';



const StartScreenCss = StyleSheet.create({

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
        backgroundColor: '#F5F5F5',
        flex: 0.35,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      container10: {
        backgroundColor: '#F5F5F5',
        flex: 0.15,
        flexDirection: "row",
      },
      container15: {
        backgroundColor: '#F5F5F5',
        flex: 0.15,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      container8: {
        backgroundColor: '#F5F5F5',
        flex: 0.08,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      container7: {
        backgroundColor: '#F5F5F5',
        flex: 0.08,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      container9: {
        backgroundColor: '#F5F5F5',
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