import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import TodoListView from "./TodoListView";

type Task = string;
type TaskList = Task[];

const App: React.FC = () => {
  const [task, setTask] = useState<Task>("");
  const [tasksList, setTasksList] = useState<TaskList[]>([]);
  const [currentList, setCurrentList] = useState<TaskList>([]);
  const [isViewingList, setIsViewingList] = useState<boolean>(false);
  const [regenerateCount, setRegenerateCount] = useState<number>(0);
  const [test, setTestMessage] = useState<string>('Temp');
  
  
  const fetchStepsFromAPI = async (task: string) => {
    const response = await fetch('https://2619-2603-8002-500-318e-3559-4da1-26bf-d996.ngrok.io/generatePrompt',
    {
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        message: task
      })  
    })
    console.log(await response.json())
    return [`${task} step 1`, `${task} step 2`, `${task} step 3`];
  };

  const handleCreateList = async () => {
    if (regenerateCount < 3) {
      const steps = await fetchStepsFromAPI(task);
      setCurrentList(steps);
      setRegenerateCount(regenerateCount + 1);
    } else {
      alert("You have reached the maximum regeneration limit.");
    }
  };

  const handleSaveList = () => {
    setTasksList([...tasksList, currentList]);
    setCurrentList([]);
    setTask("");
    setRegenerateCount(0);
  };

  const handleSelectList = (index: number) => {
    setCurrentList(tasksList[index]);
    setIsViewingList(true);
  };

  const handleBack = () => {
    setIsViewingList(false);
    setCurrentList([]);
  };

  useEffect(() => {
    fetch('https://2619-2603-8002-500-318e-3559-4da1-26bf-d996.ngrok.io/test',{

    })
      .then(response => response.json())
      .then(data => {
          console.log(data.message); 
          setTestMessage(data.message) // Should print "Server is working!"
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <View style={styles.container}>
      {!isViewingList ? (
        <>
          <TextInput
            value={task}
            onChangeText={(text) => setTask(text)}
            placeholder="Enter your task..."
            style={styles.input}
          />
          <Button title="Generate To-Do List" onPress={handleCreateList} />
          <Text> {test}</Text>
          {currentList.length > 0 && (
            <View>
              <FlatList
                data={currentList}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
              />
              <Button title="Save List" onPress={handleSaveList} />
              <Button title="Regenerate" onPress={handleCreateList} />
            </View>
          )}
          <FlatList
            data={tasksList}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleSelectList(index)}>
                <Text>List {index + 1}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      ) : (
        <TodoListView
          currentList={currentList}
          setCurrentList={setCurrentList}
          goBack={handleBack}
        />
      )}
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

export default App;
