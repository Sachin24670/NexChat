import User from "../model/User.model.js";

export const searchContacts = async (req, res) => {
  try {
    const {searchTerm} = req.body()
    if(searchTerm === undefined || searchTerm===null){
        return res.status(400).json({ message: "Search Term is Required" });
    }
    const sanitize_search_term = searchTerm.replace(/[.*+?^$(){}|[\]\\]/g,"\\$&")

    const regex = new RegExp(sanitize_search_term,"i")

    const contacts = await User.find({
        $and:[
            {_id:{$ne:res.UserId}},
            {
            $or:[{firstName: regex },{lastName: regex},{email: regex}]
            }
        ]
    })

    res.status(200).json({contacts});
  } catch (error) {
    console.log("Internal Server Error", error.message);
  }
};
