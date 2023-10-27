import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import useNotification from "../../hooks/common/useNotification";

export default function TabOneScreen() {
	const { notification } = useNotification();

	console.log(notification);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Title : {notification.title}</Text>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<Text style={styles.title}>Body : {notification.body}</Text>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<Text style={styles.title}>Data : {notification.data.title}</Text>
			<Text style={styles.title}>Data : {notification.data.body}</Text>
			{/* <EditScreenInfo path='app/(tabs)/index.tsx' /> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		fontSize: 20,
		fontWeight: "bold"
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%"
	}
});
