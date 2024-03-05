import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    section: {
        marginTop:0, 
        paddingHorizontal: 20,
        fontSize: 13,
        textAlign: "left",
        fontWeight: 400,
        color: "#222",
        lineHeight: 1.2,
        marginBottom: 50,
    },
    rightSection: {
        textAlign: "right",
    },
    text: {
        fontSize: 9,
        textAlign: "left",
        fontWeight: 400,
        color: "#222",
        lineHeight: 1.7,
        display:"block",
        width: "100%",
    },
    caps: {
        fontWeight: 800,
        fontSize: 11,
    },
    mb_10: {
        fontSize: 10,
        marginBottom: 5,
        fontWeight:"bold",
    },

    textLeft: {
        textAlign: "left",
        fontSize: 10,
    },
    textBold: {
        fontWeight: 900,
    },
    textUnderline: {
        textDecoration: "underline",
    },
    table: {
        padding: 0,
        margin: 0,
    },
    row: {
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #999',
        padding: 0,
        margin: 0,
    },
    th: {
        fontWeight: "bold",
        fontSize: 8,
        padding: 4,
        margin: 0,
        backgroundColor: "#444",
        color: "#fff"
    },
    thtrans: {
        fontWeight: "bold",
        fontSize: 11,
        padding: 4,
        margin: 0,
        backgroundColor: "#fff",
    },
    foot: {
        backgroundColor: "#afafaf",
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #999',
        padding: 0,
        margin: 0,
    },
    td: {
        fontSize: 7,
        padding: 4,
        margin: 0,
        backgroundColor: "#fff",
        color: "#444",
        border: "1px solid #999",
        borderTopWidth: 0,
    },
    fixedWidth: {
        width: 30,
    },
    desc: {
        width: "20%",
    },
    desc25: {
        width: "25%",
    },
    desc2: {
        width: "30%",
    },
    desc3: {
        width: "80%",
    },
    desc70: {
        width: "70%",
        overflow:"wrap",
    },
    desc60: {
        width: "60%",
        overflow:"hidden",
        textOverflow:"ellipsis",
        whiteSpace:"nowrap",

    },
    desc20right: {
        width: "20%",
        textAlign: "right",
    },
    desc4: {
        width: "40%",
        textAlign: "right",
    },
    desc5: {
        width: "50%",
    },
    desc40: {
        width: "40%",
    },
    sn: {
        width: "10%",
    },
    boldText: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        color: "#222",
        lineHeight: 2.0,
        marginBottom: 10,
        marginTop: 30,
        textDecoration: 'underline',
    },
    boldText2: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        color: "#222",
        lineHeight: 2.0,
        marginBottom: 10,
        marginTop: 0,
        textDecoration: 'underline',
    },
    textTransformUpper: {
        textTransform:'uppercase',
    },
    textTransformCap: {
        textTransform:'capitalize',
    },
    statusDarkGreen: {
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
        color: "#fff",
    },
    statusRed: {
        borderColor: "#ef5350",
        backgroundColor: "#ef5350",
        color: "#fff",
    },
});


const TableHead = () => {
    return (
        <>
            <View style={[styles.row]}>
                <Text style={[styles.th, styles.fixedWidth]}>SN</Text>
                <Text style={[styles.th, styles.desc]}>Employee</Text>
                <Text style={[styles.th, styles.desc]}>Date</Text>
                <Text style={[styles.th, styles.desc]}>Time In</Text>
                <Text style={[styles.th, styles.desc]}>Time Out</Text>
                <Text style={[styles.th, styles.desc]}>Status</Text>
            </View>
        </>
    )
}


const TableSumsHead = () => {
    return (
        <>
            <View style={[styles.row]}>
                <Text style={[styles.th, styles.fixedWidth]}>SN</Text>
                <Text style={[styles.th, styles.desc5]}>Record Category</Text>
                <Text style={[styles.th, styles.desc5]}>No of Records</Text>
            </View>
        </>
    )
}


export const AttendancePage = ({ data, query }) => {
    let sn = 1;

    return (
        <>
            <View style={{paddingBottom: 35}}>
                <Text style={[styles.boldText, styles.textTransformUpper, {marginBottom: 0}]}>
                    KIMBERLY RYAN ATTENDANCE REPORT
                </Text>

                <Text style={[styles.boldText2, styles.textTransformUpper]}>
                    <u>STAFF: {data.staff}</u>, 
                    <u>YEAR: {query.year}</u>, 
                    <u>{(query.cycle === "thisweek" || query.cycle === "lastweek") ? `Week ${query.week}, ${query.month} ${query.year}` : 
                    ((query.cycle === "thismonth" || query.cycle === "lastmonth") ? `${query.month} ${query.year}` : query.date)}</u>
                </Text>


                {/* Summary */}
                {data.sums && data.sums.length > 0 ? (
                    <View style={styles.section}>
                        <View style={styles.table}>
                            <TableSumsHead />
                            {data.sums && data.sums.slice(0,3).map((row, i) => (
                                <View style={[styles.row]} key={i}>
                                    <Text style={[styles.td, styles.fixedWidth]}>
                                        {sn++}
                                    </Text>
                                    <Text style={[styles.td, styles.desc5]}>
                                            {row.name && row.name}
                                    </Text>
                                    <Text style={[styles.td, styles.desc5]}>
                                            {row.count && row.count}
                                    </Text>
                                </View>
                            ))}
                            </View>
                        </View>
                ) : null}


                {/* Items */}
                {data.data && data.data.length > 0 ? (
                    <View style={styles.section}>
                        <View style={styles.table}>
                            <TableHead />
                            {data.data && data.data.map((row, i) => (
                                <View style={[styles.row]} key={i}>
                                    <Text style={[styles.td, styles.fixedWidth]}>
                                        {sn++}
                                    </Text>
                                    <Text style={[styles.td, styles.desc]}>
                                        {row.employee?.first_name && row.employee?.first_name} {" "}
                                        {row?.employee?.last_name && row?.employee?.last_name}
                                    </Text>
                                    <Text style={[styles.td, styles.desc]}>
                                        {row.date && row.date}
                                    </Text>
                                    <Text style={[styles.td, styles.desc]}>
                                        {row.timeIn && row.timeIn}
                                    </Text>
                                    <Text style={[styles.td, styles.desc]}>
                                        {row.timeOut && row.timeOut}
                                    </Text>
                                    <Text style={[styles.td, styles.desc, styles.textTransformCap,
                                    (row.timeIn >= "8:30:00 AM") ? styles.statusRed : styles.statusDarkGreen
                                    ]}>
                                        {(row.timeIn >= "8:30:00 AM") ? "Late" : "On time"}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : null}

            </View>
        </>
    )
}

export default AttendancePage;
