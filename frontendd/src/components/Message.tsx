import { MessageTypes } from '../Types'

const Message = ({message,username}:{message:MessageTypes,username:string}) => {
  return (
    <article className={`${message.from === username ? "justify-self-end" : "border border-secondary"}
        rounded-lg card py-2 px-4 w-fit my-4
    `}>
        <h5 className="text-secondary text-xs">{message.from}</h5>
        <p className="text-sm">{message.body}</p>
    </article>
  )
}

export default Message