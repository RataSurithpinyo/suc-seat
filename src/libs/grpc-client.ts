import { Client } from "@grpc/grpc-js";

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


export function uploadPlaceInfo(place: { id: string ; name: string; own:string ; capacity: number; availableSeat:number; facilities:string[];}){
    console.log("Place Info to be uploaded:", place);
  
    try {
      // Make the gRPC call
      var call = client.uploadPlaceInfo(
        { id : place.name,
          name: place.name,
          ownner: place.name,
          capacity:place.capacity,
          availableSeat:place.availableSeat,
          facilities:place.facilities
        }, function(err: any, response: any) {
        console.log('response:', response);
      });

      call.on('data', function (response: any) {
        console.log("Response from the server:", response);
        // Handle each piece of streaming data here
      });
  
      call.on('end', function () {
        console.log('Streaming response ended');
      });
  
      call.on('error', function (err: any) {
        console.error('Error:', err);
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
        {targetName: UpdatePlace.targetName,
          newInfo:{
            id: UpdatePlace.newInfo.id,
            name: UpdatePlace.newInfo.name,
            owner:UpdatePlace.newInfo.owner,
            capacity:UpdatePlace.newInfo.capacity,
            facilities:UpdatePlace.newInfo.facilities
          }
        }, function(err: any, response: any) {
        console.log('response:', response);
      });
    } catch (err) {
      console.error('Error:', err);
    }
  }
  export function getPlaceInfo(PlaceName: any){
    console.log("Place Info to be uploaded:", PlaceName);
  
    try {
      // Make the gRPC call
   
      var call = client.getPlaceInfo(
        PlaceName, function(err: any, response: any) {
        console.log('response:', response);
      });

    } catch (err) {
      console.error('Error:', err);
    }
  }
  export function searchPlaces(PlaceName: any){
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
  export function filterPlaces(Filter: any){
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
  export function removePlaces(PlaceName:any){
    console.log("Place Info to be uploaded:", PlaceName);
  
    try {
      // Make the gRPC call
   
      var call = client.removePlaces(
        PlaceName, function(err: any, response: any) {
        console.log('response:', response);
      });
    } catch (err) {
      console.error('Error:', err);
    }
  }

