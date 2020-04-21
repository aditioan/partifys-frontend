//define all the actions

//track operations
//--- GET_TRACKS ---
//When the user accepts a refresh play list message from the server
//the user should use GET_TRACKS to refresh the shared playlist

//--- ADD_TRACK ---
//Add a track to the shared playlist

//--- DELETE_TRACK ---
//A user can only delete the track he added
//if a track can be deleted by a certain user, the track should has a delete icon

//--- VOTE_TRACK ---
//A user can click the vote icon(a heart) to vote a track, click again, the state becomes "not vote"
export const GET_TRACKS = 'GET_TRACKS'
export const ADD_TRACK = 'ADD_TRACK'
export const DELETE_TRACK = 'DELETE_TRACK'
export const VOTE_TRACK = 'VOTE_TRACK'
