const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "/Users/narongdaetdata/Documents/SA_proj/suc-seat/src/libs/service.proto";
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});
var packageObject = grpc.loadPackageDefinition(packageDefinition);
var clientService = packageObject.places.PlaceService;
const client = new clientService("localhost:9000", grpc.credentials.createInsecure());

// import { filterPlaces, getPlaceInfo, removePlaces, updatePlace, uploadPlaceInfo } from "@/libs/grpc-client";
export function uploadPlaceInfo(place: { id: string ; name: string; own:string ; capacity: number; availableSeat:number; facilities:string[];}){
    console.log("Place Info to be uploaded:", place);
  
    try {
      // Make the gRPC call
      var call = client.uploadPlaceInfo(
        place, function(err: any, response: any) {
        console.log('response:', response);
      });

    } catch (err) {
      console.error('Error:', err);
    }
  }

  export function updatePlace(UpdatePlace: { targetName: string; newInfo:{ id: string ; name: string; owner:string ; capacity: number; facilities:string[];} }){
    console.log("Place Info to be uploaded:", UpdatePlace);
  
    try {
      // Make the gRPC call
   
      var call = client.uploadPlaceInfo(
        UpdatePlace, function(err: any, response: any) {
        console.log('response:', response);
      });
    } catch (err) {
      console.error('Error:', err);
    }
  }
  export function getPlaceInfo(PlaceName: {name : string}){
    console.log("Place Info to be uploaded:", PlaceName);
  
    try {
      // Make the gRPC call
   
      var call = client.getPlaceInfo(
        PlaceName, function(err: any, response: any) {
        console.log('response:', response);
      });

      // getPlaceInfo({
      //   name : "abc"
      // })

    } catch (err) {
      console.error('Error:', err);
    }
  }
  export function searchPlaces(PlaceName: {name : string}){
    console.log("Place Info to be uploaded:", PlaceName);
  
    try {
      // Make the gRPC call
   
      var call = client.searchPlaces(
        PlaceName, function(err: any, response: any) {
        console.log('response:', response);
      });
    } catch (err) {
      console.error('Error:', err);
    }
  }
  export function filterPlaces(Filter: {minCapacity? : number; facilities:string[]}){
    console.log("Place Info to be uploaded:", Filter);
    try {
      var call = client.filterPlaces(
        Filter, function( err: any , response: any ) {
          console.log(response)
      });
      
    } catch (err) {
      console.error('Error:', err);
    }
  }
  export function removePlaces(PlaceName:{name : string}){
    console.log("Place Info to be uploaded:", PlaceName);
  
    try {
      // Make the gRPC call
   
      var call = client.removePlaces(
        PlaceName, function(err: any, response: any) {
        console.log('response:', response);
        //fill to make an action
      });

      //how to called

      // filterPlaces({
      //   facilities : ["toilet"]
      // })

      // filterPlaces({
      //   minCapacity:1,
      //   facilities : ["toilet"]
      // })

    } catch (err) {
      console.error('Error:', err);
    }
  }

