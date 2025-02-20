import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles with a more professional, modern look
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 9, // Slightly smaller font size for a sleek design
        fontFamily: "Helvetica",
        backgroundColor: "#ffffff",
    },
    headerSection: {
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        letterSpacing: "0.5px",
    },
    subHeaderText: {
        fontSize: 12,
        color: "#555",
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    table: {
        width: "100%",
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f8f8f8", // Light gray background for headers
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    tableHeaderCell: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        flex: 1,
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    tableCell: {
        fontSize: 10,
        color: "#555",
        textAlign: "center",
        flex: 1,
    },
    paymentSummary: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "#f4f4f4",
        borderRadius: 5,
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ddd", // Light border
    },
    paymentSummaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    paymentSummaryLabel: {
        fontSize: 12,
        color: "#555",
    },
    paymentSummaryValue: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderTopWidth: 2,
        borderTopColor: "#333", // Bold line to separate total
        marginTop: 10,
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    totalAmount: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#2c9f6d", // Green color for the total amount
    },
    footer: {
        marginTop: 30,
        fontSize: 8,
        color: "#777",
        textAlign: "center",
        padding: 15,
    },
});

const InvoicePDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Invoice Header Section */}
            <View style={styles.headerSection}>
                <View>
                    <Text style={styles.headerText}>Invoice</Text>
                    <Text style={styles.subHeaderText}>Order ID: #123456789</Text>
                    <Text style={styles.subHeaderText}>Date: February 15, 2025</Text>
                    <Text style={styles.subHeaderText}>Status: Paid</Text>
                </View>
            </View>

            {/* Items Purchased Table */}
            <View>
                <Text style={styles.sectionTitle}>Items Purchased</Text>
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderCell}>Product Name</Text>
                        <Text style={styles.tableHeaderCell}>Quantity</Text>
                        <Text style={styles.tableHeaderCell}>Size</Text>
                        <Text style={styles.tableHeaderCell}>Color</Text>
                        <Text style={styles.tableHeaderCell}>Discount</Text>
                        <Text style={styles.tableHeaderCell}>Price</Text>
                    </View>

                    {/* Product 1 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Product Name</Text>
                        <Text style={styles.tableCell}>2</Text>
                        <Text style={styles.tableCell}>M</Text>
                        <Text style={styles.tableCell}>Red</Text>
                        <Text style={styles.tableCell}>10%</Text>
                        <Text style={styles.tableCell}>$50</Text>
                    </View>

                    {/* Product 2 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Another Product</Text>
                        <Text style={styles.tableCell}>1</Text>
                        <Text style={styles.tableCell}>L</Text>
                        <Text style={styles.tableCell}>Blue</Text>
                        <Text style={styles.tableCell}>5%</Text>
                        <Text style={styles.tableCell}>$30</Text>
                    </View>
                </View>
            </View>

            {/* Payment Summary Section */}
            <View style={styles.paymentSummary}>
                <View style={styles.paymentSummaryRow}>
                    <Text style={styles.paymentSummaryLabel}>Subtotal:</Text>
                    <Text style={styles.paymentSummaryValue}>$80</Text>
                </View>
                <View style={styles.paymentSummaryRow}>
                    <Text style={styles.paymentSummaryLabel}>Tax (5%):</Text>
                    <Text style={styles.paymentSummaryValue}>$4</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>$84</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Thank you for your business!</Text>
                <Text>Your Company - All Rights Reserved</Text>
            </View>
        </Page>
    </Document>
);

export default InvoicePDF;
