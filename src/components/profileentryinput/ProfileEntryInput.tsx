type ProfileProps = {
    id?:number, 
    editable?: boolean, 
    defaultval?:string,
    type?:string
}

export const ProfileEntryInput: React.FC<ProfileProps> = ({ editable=false, defaultval="", id="-1", type="text"}) => {
    if (editable) {
        return (
            <input type={type} className="form-control" defaultValue={defaultval}/>  // doesn't let me assign id={id} ???...
        )
    }
    else {
        return (
            <input type={type} readOnly className="form-control" defaultValue={defaultval}/> 
        )
    }
}