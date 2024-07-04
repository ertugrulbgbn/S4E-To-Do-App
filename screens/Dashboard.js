import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Image } from 'react-native';

export default function Dashboard({ route, navigation }) {
  const { username } = route.params; 
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const addTask = () => {
    if (task.length > 0) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const newCompletedTasks = new Set(completedTasks);
    if (completedTasks.has(index)) {
      newCompletedTasks.delete(index);
    } else {
      newCompletedTasks.add(index);
    }
    setCompletedTasks(newCompletedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderTask = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
        <View style={styles.checkbox}>
          {completedTasks.has(index) && <View style={styles.checkedCircle} />}
        </View>
      </TouchableOpacity>
      <Text style={[styles.taskText, { textDecorationLine: completedTasks.has(index) ? 'line-through' : 'none' }]}>
        {item}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(index)}>
        <Image source={require('../assets/images/delete.png')} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBox}>
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={require('../assets/images/log19.png')} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.userPhotoContainer}>
          <Image source={require('../assets/images/userimage.png')} style={styles.userPhoto} />
          <Text style={styles.welcomeText}>Welcome {username}</Text>
        </View>

        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 2, justifyContent: 'flex-start', padding: 20 }}>
        <Text style={styles.toDoHeader}>Add A New Task</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Task Name"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <Image source={require('../assets/images/add.png')} style={{ width: 16, height: 16 }} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.taskHeaderText}>Task List</Text>

        <View style={styles.tasksContainer}>
          <Text style={styles.dailyTasksHeader}>Daily Task</Text>
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBox: {
    backgroundColor: '#50c2c9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  icon: {
    width: 157,
    height: 157,
  },
  logoutButtonContainer: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 15,
    elevation: 3,
  },
  logoutButtonText: {
    fontFamily: 'CustomFont-Regular',
    marginTop: 1,
    color: '#000',
  },
  userPhotoContainer: {
    alignItems: 'center',
    marginTop: 90,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'CustomFont-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  toDoHeader: {
    fontSize: 17,
    fontFamily: 'CustomFont-Regular',
    marginLeft: 7,
    marginTop: 15,
    marginBottom: 18,
    textAlign: 'left',
  },
  inputContainer: { 
    flexDirection: 'row',
    marginBottom: 20,

  },
  input: {
    flex: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    fontFamily: 'CustomFont-Light',
    borderRadius: 20,
    padding: 10,  
    fontSize: 15,
    elevation: 1,
  },
  addButton: {
    backgroundColor: '#50c2c9',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'CustomFont-Regular',
    color: '#FFFFFF',
    marginTop: 3,
    marginLeft: 6,
  },
  tasksContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    flex: 1,
    elevation: 3,
  },
  dailyTasksHeader: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'CustomFont-Regular',
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 7,
    textAlign: 'left',
  },
  taskHeaderText: {
    fontSize: 17,
    fontFamily: 'CustomFont-Regular',
    marginLeft: 7,
    marginBottom: 1,
    marginTop: 5,
    textAlign: 'left',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    marginTop: 1,
    color: '#666666',
    fontFamily: 'CustomFont-Regular',
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: '#000000',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 15,
    height: 15,
    borderRadius: 1,
    backgroundColor: '#50c2c9',
  },
  deleteIcon: {
    width: 18,
    height: 18,
    marginLeft: 10,
    tintColor: '#666666',
  },
  flatListContent: {
    flexGrow: 1,
  },
});
