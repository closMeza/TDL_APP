import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Button,
  Text,
  StyleSheet,
} from "react-native";

type Task = string;
type TaskList = Task[];

const TodoListView: React.FC<{
  currentList: TaskList;
  setCurrentList: React.Dispatch<React.SetStateAction<TaskList>>;
  goBack: () => void;
}> = ({ currentList, setCurrentList, goBack }) => {
  const [task, setTask] = useState<Task>("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );

  const handleEditTask = (index: number) => {
    setSelectedTaskIndex(index);
    setTask(currentList[index]);
  };

  const handleSaveEditedTask = () => {
    if (selectedTaskIndex !== null) {
      const updatedList = [...currentList];
      updatedList[selectedTaskIndex] = task;
      setCurrentList(updatedList);
      setTask("");
      setSelectedTaskIndex(null);
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedList = [...currentList];
    updatedList.splice(index, 1);
    setCurrentList(updatedList);
  };

  const handleAddNewTask = () => {
    setCurrentList([...currentList, task]);
    setTask("");
  };

  return (
    <View>
      <Button title="Back" onPress={goBack} />
      <FlatList
        data={currentList}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <TextInput
              value={selectedTaskIndex === index ? task : item}
              onChangeText={(text) => setTask(text)}
              style={styles.input}
            />
            <Button title="Edit" onPress={() => handleEditTask(index)} />
            <Button title="Save" onPress={handleSaveEditedTask} />
            <Button title="Delete" onPress={() => handleDeleteTask(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={task}
        onChangeText={(text) => setTask(text)}
        placeholder="Add new task..."
        style={styles.input}
      />
      <Button title="Add Task" onPress={handleAddNewTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default TodoListView;
