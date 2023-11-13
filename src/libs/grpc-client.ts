import { deflate } from "zlib";
const grpc = require('@grpc/grpc-js')
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "src/libs/service.proto"
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});
var packageObject = grpc.loadPackageDefinition(packageDefinition);
var clientService = packageObject.places.PlaceService;
const client = new clientService("localhost:9000", grpc.credentials.createInsecure());

// interface 
interface PlaceListInterface {
  place: {
    facilities: string[];
    id: string;
    name: string;
    owner: string ;
    capacity: number ;
    availableSeat: number;
  }[];
}
interface PlaceNameInterface {
  name:string;
}
interface PlaceIdInterface {
  id:string;
}
interface PlaceInterface  {
  facilities: string[];
  id: string;
  name: string;
  owner: string ;
  capacity: number ;
  availableSeat: number ;
}
interface UpdatePlaceInterface{ 
  targetName: 
  string; newInfo:
  { 
    id: string ;
     name: string; 
     owner:string ; 
     capacity: number; 
     facilities:string[];
    } 
  }


// import { filterPlaces, getPlaceInfo, removePlaces, updatePlace, uploadPlaceInfo } from "@/libs/grpc-client";
export function uploadPlaceInfo(place:PlaceInterface){
    console.log("Place Info to be uploaded:", place);
  
    try {
      // Make the gRPC call
      var call = client.uploadPlaceInfo(
        place, function(err: any, response: PlaceInterface) {
        console.log('response:', response);
      });

    } catch (err) {
      console.error('Error:', err);
    }
  }

  export function updatePlace(UpdatePlace: UpdatePlaceInterface){
    console.log("Place Info to be updated:", UpdatePlace);
  
    try {
      // Make the gRPC call
   
      var call = client.uploadPlaceInfo(
        UpdatePlace, function(err: any, response: UpdatePlaceInterface) {
        console.log('response:', response);
      });
    } catch (err) {
      console.error('Error:', err);
    }
  }
  export function getPlaceInfo(PlaceId: PlaceIdInterface){
    console.log("Place Info to be geted:", PlaceId);
      return new Promise<PlaceInterface>((resolve, reject) => {
        try {
          // Make the gRPC call
          var call = client.getPlaceInfo(
            PlaceId,
            function callback(
              err: any,
              response: PlaceInterface
            ) {
              if (err) {
                console.error("Error:", err);
                reject(err);
              } else {
                // Log the response if needed
                console.log("response:", response);
                resolve(response);
              }
            }
          );
        } catch (err) {
          console.error("Error:", err);
          reject(err);
        }
      });
    }

  export function searchPlaces(PlaceName: PlaceNameInterface) {
    console.log("Place Info to be searched:", PlaceName);
  
    return new Promise<PlaceListInterface>((resolve, reject) => {
      try {
        // Make the gRPC call
        var call = client.searchPlaces(
          PlaceName,
          function callback(
            err: any,
            response: PlaceListInterface
          ) {
            if (err) {
              console.error("Error:", err);
              reject(err);
            } else {
              // Log the response if needed
              console.log("response:", response);
              resolve(response);
            }
          }
        );
      } catch (err) {
        console.error("Error:", err);
        reject(err);
      }
    });
  }
  export function filterPlaces(Filter: {minCapacity? : number; facilities:string[]}){
    console.log("Place Info to be filtered:", Filter);
    try {
      var call = client.filterPlaces(
        Filter, function( err: any , response: PlaceListInterface ) {
          console.log(response)
      });
      
    } catch (err) {
      console.error('Error:', err);
    }
  }
  export function removePlaces(PlaceName:PlaceNameInterface){
    console.log("Place Info to be removed:", PlaceName);
  
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

