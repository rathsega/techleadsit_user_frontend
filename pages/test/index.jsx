// Correct usage
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const MyDoc = () => (
  <Document>
    <Page size="A4">
      <View>
        <Text>Hello World</Text>
      </View>
    </Page>
  </Document>
);

export default MyDoc;