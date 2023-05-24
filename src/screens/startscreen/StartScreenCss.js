import { StyleSheet } from 'react-native';

const StartScreenCss = StyleSheet.create({
    button: {
        alignSelf: "flex-end",
        width: '80%',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        fontFamily: "stratos",
        borderRadius: 4,
        elevation: 1,
        backgroundColor: 'white'
      },
      container40: {
        backgroundColor: '#CEE7ED',
        flex: 0.35,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      container10: {
        backgroundColor: '#CEE7ED',
        flex: 0.15,
        flexDirection: "row",
      },
      container15: {
        backgroundColor: '#CEE7ED',
        flex: 0.15,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      container8: {
        backgroundColor: '#CEE7ED',
        flex: 0.08,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      container7: {
        backgroundColor: '#CEE7ED',
        flex: 0.08,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      container9: {
        backgroundColor: '#CEE7ED',
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
        fontSize: 18,
        color: "#5AA0A7",
        paddingLeft: '21%',
        paddingRight: '21%',
      },
      texts3: {
        fontFamily: "stratos",
        alignSelf: "center",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 14,
        color: "#172B2C",
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