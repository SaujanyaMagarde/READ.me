import React,{useCallback, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select,Rte} from '../index'
import service from '../../Appwrite/services'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import './postform.css'
function Postform({post}){
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{
            title: post ?.title || '',
            slug : post?.slug || '',
            content:post?.content || '',
            Status : post?.Status || 'active',
        },
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const submit = async (data)=>{
        if(post){
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null

            if(file){
                service.deleteFile(post.Featured_image)
            }//errror
            const dbpost = await service.updatePost(post.$id,{
            ...data,
            Featured_image:file?file.$id : undefined,});
            if(dbpost ){
                navigate(`/post/${dbpost.$id}`)
            }
        }else{
            const file = await service.uploadFile(data.image[0]);
            if(file){
                const fileid =  file.$id;
                data.Featured_image = fileid;
                console.log(userData);
                const dbpost = await service.createPost({
                    ...data,
                    userId : userData.$id,
                });
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }

    const slugtransform = useCallback((value) =>{
        if(value && typeof value === "string"){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        }
        return ''
    },[])

    useEffect(()=>{
        const subscription = watch((value,{name}) =>{
            if(name === 'title'){
                setValue('slug',slugtransform(value.title,{shouldvalidate : true}))
            }
        });
        return ()=>{
            subscription.unsubscribe() //do not repeat
        }
    },[watch,slugtransform,setValue])
     
    return (
        <form onSubmit={handleSubmit(submit)} className="post-form">
          <div className="form-left-section">
            <Input
              label="Title :"
              placeholder="Title"
              className="input-field"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug :"
              placeholder="Slug"
              className="input-field"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugtransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />
            <Rte label="Content :" name="content" control={control} defaultValue={getValues("content")} />
          </div>
          <div className="form-right-section">
            <Input
              label="Featured Image :"
              type="file"
              className="input-field"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="featured-image-container">
                <img
                  src={service.getFilepreview(post.Featured_Image)}
                  alt={post.title}
                  className="featured-image"
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="input-field"
              {...register("Status", { required: true })}
            />
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="submit-button"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      );
      
}
export default Postform