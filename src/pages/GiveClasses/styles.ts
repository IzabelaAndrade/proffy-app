import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8257e6',
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },

  contant: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    color: '#d4c2ff',
    fontSize: 16,
    lineHeight: 26,
    marginTop: 24,
    maxWidth: 240
  },
  okButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    backgroundColor: '#04d361',
    height: 58,
    borderRadius: 8
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold'
  }
})


export default styles;