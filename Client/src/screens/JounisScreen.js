import React,{useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    Text, 
    Alert,
    TextInput,
    Grid,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
  } from "react-native";
import Swipeout from 'react-native-swipeout';
import firebaseConfig from '../firebase/firebaseConfig.js';
import * as ImagePicker  from 'expo-image-picker';
import * as JounisDAO from '../firebase/DAO.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imageBackGroundInsertLink from '../assets/backgroundButton_Insert.jpg';
import { Button } from 'react-native-paper';
import BackGroundRose from '../assets/rose.jpg'
import { WikipediaScreen } from './WikipediaScreen.js';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://10.82.141.162:3000";
const socket = socketIOClient(ENDPOINT);

console.disableYellowBox = true;

const JounisScreen = () => {
    const[data, setData] = useState([]);
    const[filterData, setFilterData] = useState('');
    
    const listenForItems = () => {
      // var items = [];
      socket.emit("getAllStudents","GetAll Students Succesfully !");
      socket.on("getAllStudents", res =>{
        var items = [];
        res.forEach(students => {
          console.log(students.codeStudent);
          let item = {
            _id: students._id,
            nameStudent: students.nameStudent,
            codeStudent: students.codeStudent,
            careerStudent: students.careerStudent,
            dateOfBirthStudent:students.dateOfBirthStudent,
          };
          items.push(item);
        });
        setData(items);
      });
    };

    const GetAllStudent = () => {
      //-----FireBase-----//
      //   firebaseConfig.database().ref().child('Jounis').on('value',(snapshot) =>{
      //     var items = [];
      //     snapshot.forEach((child) => {
      //         let item = {
      //             key: child.key,
      //             name: child.val().name,
      //             title: child.val().title,
      //             image: child.val().image
      //         };
      //         items.push(item);
      //     })
      //     setData(items);
      // });
      //-----FireBase-----//

      //-----Socket-------//
      if(filterData == ""){
        listenForItems();
      }else{
        socket.emit("getAllStudents","GetAll Students Succesfully !");
        socket.on("getAllStudents", (res) =>{
          var items = [];
          res.forEach(students => {
            console.log(students.codeStudent);
            let item = {
              _id: students._id,
              nameStudent: students.nameStudent,
              codeStudent: students.codeStudent,
              dateOfBirthStudent:students.dateOfBirthStudent,
          };
          if(item.nameStudent.includes(filterData)){
            items.push(item);
          } 
        });
        setData(items);
        });
      }
      //-----Socket-------//
    } 
    //-----FireBase-----//
    // const FilterData = () => {
    //   //-----FireBase-----//
    //   // if(filterData == ''){
    //   //   GetAllJounis();
    //   // }else{
    //   //   firebaseConfig.database().ref().child('Jounis').on('value',(snapshot) =>{
    //   //     var items = [];
    //   //     snapshot.forEach((child) => {
    //   //         let item = {
    //   //             key: child.key,
    //   //             name: child.val().name,
    //   //             title: child.val().title,
    //   //             image: child.val().image
    //   //         };
    //   //         if(item.name.includes(filterData)){
    //   //           items.push(item);
    //   //         }
    //   //     })
    //   //     setData(items);
    //   // });
    //   // }
    //   
    // }
    //-----FireBase-----//
    const [modalVisible, setModalVisible] = useState(false);
    
    const hideDialog = () => {
        setModalVisible(false);
    };
    const showDialog = () => {
        setModalVisible(true);
    };
    const [currentItem, setCurrentItem] = useState(null);
    const setCurrent = async (item) =>{
        await setCurrentItem(item);
    };

    useEffect(() => {
      GetAllStudent();
    }, [filterData]);

    return(
    <View style={styles.contaier} > 
      <ImageBackground source={BackGroundRose} style={{width:width, height:height}}>
      <Text style={styles.text}>Student List</Text>
      <View style={styles.row}>
      <TextInput style={{backgroundColor: '#2AB7CA', borderColor:'#E7EFF6',width:275,height:50,marginTop:5,paddingLeft:5,fontSize:20,color:"white",borderRadius:5}} 
        placeholderTextColor="white" placeholder={('Search...')} 
        onChangeText={(text)=> {setFilterData(text)}}/>
      <TouchableOpacity style={{borderWidth:1,borderRadius:50,width:50,height:48,justifyContent:'center',backgroundColor:'white',margin:5.25}} onPress={() =>{showDialog();}}>
        <Text style={{textAlign:'center',fontSize:50}} onPress={() =>{showDialog();}}>+</Text>
      </TouchableOpacity>

      </View>
      <FlatList data={data} renderItem={({ item }) => <ListItem  item={item} showDialog={showDialog} setCurrent={setCurrent}  />} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {currentItem ? (
          <StudentUpdate item={currentItem} hideDialog={hideDialog}/>
        ) : (
          <StudentInsert hideDialog={hideDialog}/>
        )}
      </Modal>
      </ImageBackground>
    </View>
    );
};

const StudentInsert = (props) => {
    const [nameStudent, setNameStudent] = useState('');
    const [codeStudent, setCodeStudent] = useState('');
    const [dateOfBirthStudent, setDateOfBirthStudent] = useState('');
    const [careerStudent, setCareerStudent] = useState('');
    const [image, setImage] = useState('https://www.everythingoverseas.com/wp-content/uploads/2018/07/10-places-portugal.jpg');

    //Choose Image From Gallery
    const _chooseImage = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3] 
        });
        
        if(!result.cancelled){
            console.log(image);
            setImage(result.uri);
        }
    };

    const OnClickInsertStudent = () => {
      socket.emit('insertStudents',nameStudent,codeStudent,careerStudent,dateOfBirthStudent);
      socket.on("insertStudents",(result) =>{ 
        console.log("Insert students is "+result);
        if(result == true){
            socket.emit("getAllStudents","GetAll Students Succesfully !");
            props.hideDialog();
        }
      });
    }
    //Choose Image From Gallery
    return (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Insert Student</Text>
            {/* <TouchableWithoutFeedback onPress={()=> _chooseImage()}>
                <Image source={{uri: image, width:200, height:150}} style={{borderWidth:1, borderColor:'black'}}/>
            </TouchableWithoutFeedback> */}
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Student's Name: </Text>
                <TextInput style={styles.textInputDialog} value={nameStudent} onChangeText={(text)=> setNameStudent(text)}/>
            </View>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Student's Code: </Text>
                <TextInput style={styles.textInputDialog} value={codeStudent} onChangeText={(text)=> setCodeStudent(text)}/>
            </View>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Student's Career: </Text>
                <TextInput style={styles.textInputDialog} value={careerStudent} onChangeText={(text)=> setCareerStudent(text)}/>
            </View>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Student's Date of Birth: </Text>
                <TextInput style={styles.textInputDialog} value={dateOfBirthStudent} onChangeText={(text)=> setDateOfBirthStudent(text)}/>
            </View>
            <View style={styles.modelButton}>
                <TouchableOpacity style={styles.openButton} onPress={()=> {props.hideDialog();}}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navopenButton} onPress={()=> {console.log('Click Insert'); OnClickInsertStudent();}}>
                    <Text style={styles.textStyle}>Insert</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
    );
};

const StudentUpdate = (props) => {
    const [_id, set_id] = useState(props.item._id);
    const [nameStudent, setNameStudent] = useState(props.item.nameStudent);
    const [codeStudent, setCodeStudent] = useState(props.item.codeStudent);
    const [careerStudent, setCareerStudent] = useState(props.item.careerStudent);
    const [dateOfBirthStudent, setDateOfBirthStudent] = useState(props.item.dateOfBirthStudent);
  
    const _chooseImage = async() => {
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3] 
      });
      
      if(!result.cancelled){
          console.log(image);
          setImage(result.uri);
      }
    };

    const OnClickUpdateStudents = () => {
        socket.emit('updateStudents',_id,nameStudent,codeStudent,careerStudent,dateOfBirthStudent);
        socket.on('updateStudents',(result) =>{
          console.log("Update Students on :"+nameStudent);
          if(result == true){
            socket.emit("getAllStudents","GetAll Students Succesfully !");
            props.hideDialog();
          }
        });
    }
    return (
        <View style={styles.centeredView} value={props.item._id}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Student</Text>
            {/* <TouchableWithoutFeedback onPress={()=> _chooseImage()}>
                <Image source={{uri: image, width:200, height:200}} style={{borderWidth:1, borderColor:'black'}}/>
            </TouchableWithoutFeedback> */}
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Student's Name : </Text>
                <TextInput style={styles.textInputDialog} defaultValue={props.item.nameStudent} onChangeText={(text)=> setNameStudent(text)}/>
            </View>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Student's Code : </Text>
                <TextInput style={styles.textInputDialog} defaultValue={props.item.codeStudent} onChangeText={(text)=> setCodeStudent(text)}/>
            </View>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Student's Career : </Text>
                <TextInput style={styles.textInputDialog} defaultValue={props.item.careerStudent} onChangeText={(text)=> setCareerStudent(text)}/>
            </View>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Student's Date of birth : </Text>
                <TextInput style={styles.textInputDialog} defaultValue={props.item.dateOfBirthStudent} onChangeText={(text)=> setDateOfBirthStudent(text)}/>
            </View>
            
            <View style={styles.modelButton}>
                <TouchableOpacity style={{...styles.openButton, backgroundColor: '#2196F3'}} 
                onPress={()=> {props.hideDialog();}}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.navopenButton, backgroundColor: '#2196F3'}} onPress={()=> OnClickUpdateStudents()}>
                    <Text style={styles.textStyle}>Update</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  };

const ListItem = (props) => {

const OnClickDeleteStudent = () => {
  socket.emit('deleteStudents',props.item._id);
  socket.on('deleteStudents',(result) =>{
    console.log("Delete Student on :"+props.item._id);
    if(result == true){
      socket.emit("deleteStudents","Delete Student Succesfully !");
      socket.emit("getAllStudents","GetAll Students Succesfully !");
      props.hideDialog();
    }
  });
}

const swipeoutSettings = {
    autoClose: () => true,
    onClose: () => {
        props.setCurrent(null);
    },
    onOpen: () => {
        props.setCurrent(props.item);
        console.log(""+props.item.nameStudent);
        console.log(""+props.item._id);
        console.log("Open Swipe");
    },
    right: [
        {
            text: "Update",
            backgroundColor: "orange",
            type: "Secondary",
            onPress: () => {
              props.setCurrent(props.item);
              props.showDialog(true); 
              console.log("Update");
         },
        },
        {
            text: "Delete",
            backgroundColor: "red",
            type: "Delete",
            onPress: () => {
            Alert.alert('Delete', 'Are you want to delete '+" "+props.item.nameStudent + '?',
            [
                {text: 'No', onPress: () => console.log('Cancel Delete'), type: 'Cancel'},
                {text: 'Yes', onPress: () => OnClickDeleteStudent()}
            ],
                {cancelable:true}
            );
         }
        }
      ]
    };
    return (
    
    <View style={styles.listContainer} >
      <Swipeout {...swipeoutSettings} style={{position:'relative',borderRadius:10,backgroundColor:'#2AB7CA', marginTop:10,}}>
        <View style={styles.items}>
          {/* <Image source={{uri : props.item.image}} style={{width: 330,height: 200, borderRadius:10}}></Image> */}
            <View style={{width: 335, marginTop:5,}}>
              <Text style={styles.itemsTextNational}>Student's Name : {props.item.nameStudent}</Text>
              <Text style={styles.itemsText}>Student's Code : {props.item.codeStudent}</Text>
              <Text style={styles.itemsText}>Student's Career : {props.item.careerStudent}</Text>
              <Text style={styles.itemsText}>Student's Date of birth : {props.item.dateOfBirthStudent}</Text>
              
            </View>
        </View>
      </Swipeout>
    </View>
    

  );
};

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: width,
    height: height,
    marginBottom:10
  },
  listContainer: {
    marginLeft:10,
    marginRight:5,
    marginBottom:5,
  },
  items:{
    margin:(width*3)/300,
    padding:(width*3)/300,
    borderRadius:10,
    backgroundColor: "white",
    borderColor:'#E7EFF6',
  },
  itemsText:{
    padding: 5, 
    fontSize: 20, 
    color:'black', 
    backgroundColor:'#FFFFFF'
  },
  itemsTextNational:{
    paddingTop:5,
    paddingLeft:5,
    fontSize: 20, 
    color:'black', 
    borderRadius:10,
    backgroundColor:'#912CEE',height:35,
    color:'#FFFFFF'
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    fontWeight:'bold',
    marginTop: 50,
    marginBottom:10,
    color:'#E7EFF6',
  },
  centeredView:{
    backgroundColor: "#FFFFFF",
    marginTop:150,
    alignItems:'center',
    width:215,
    marginLeft:75,
    borderRadius:5,
  },
  modalText:{
    margin:20,
    color: '#2196F3',
    fontSize: 25,
    textAlign: "center",
  },
  textDialog:{
    margin:5,
    fontSize: 16,
    textAlign: "center",
    color: '#2196F3',
  },
  row:{
    flexDirection: 'row',
    marginLeft:15
  },
  textInputDialog:{
    padding:2,
    margin:5,
    borderRadius:5,
    borderWidth:1
  },
  modelButton:{
    flexDirection: "row",
    marginLeft:15
  },
  openButton:{
    margin:5,
    backgroundColor: "#2196F3",
    borderRadius:5,
    padding:5,
    width:75,
    height:25
  },
  navopenButton:{
    margin:5,
    backgroundColor: "#2196F3",
    borderRadius:5,
    padding:5,
    width:75,
    height:25
  },
  textStyle:{
    textAlign: "center",
    color:'#FFFFFF',
    fontStyle:'italic'
  }
  
});

export default JounisScreen;