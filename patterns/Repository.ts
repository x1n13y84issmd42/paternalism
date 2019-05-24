//	Repository pattern
//	DDD

namespace Repository {
	///////////////////////////////////////////////////////////////////////////////////
	//	Start with defining data types you are going to store in your repo.
	//	This is your [Product].
	//#region

	enum VideoAccess {
		Public,
		Private
	}

	enum VideoType {
		VOD,
		Live,
		Stream,
		AudioOnly,
	}

	enum VideoStatus {
		OnAir,
		Suspended,
		Hidden,
		Removed,
		Banned,
	}

	type User = {
		email: string;
	};

	type Comment = {
		text: string;
		author: User;
	};
	
	type Video = {
		id: string;
		title: string;
		type: VideoType;
		access: VideoAccess;
		length: number;
		created_at: Date;
		status: VideoStatus;
		views: number;
		likes: number;
		dislikes: number;
		author: User;
		comments: Array<Comment>;
	};

	//#endregion

	///////////////////////////////////////////////////////////////////////////////////
	//	Then define your [Repository] as a set of methods implementing certain criterias
	//	that make sense for the software logic.
	//	[Repositories] can be as simple as a single class, or can have an interface
	//	and few different implementations for different storage backends (files/MySQL/Mongo/cloud storages).
	//#region

	interface IVideos {
		save(v: Video);
		get(): Video[];

		relatedTo(v: Video): IVideos;
		live(isLive: boolean): IVideos;
		popular(views: number): IVideos;
		public(isPublic: boolean): IVideos;
		by(author: User): IVideos;
	}

	/**
	 * A simpleton's repository which keeps data in the app memory.
	 */
	class VideosMemory implements IVideos{
		queries: ((v: Video)=>boolean)[] = [];
		storage: Video[] = [];

		save(v: Video) {
			this.storage.push(v);
		}

		videoRelationScore(v1: Video, v2: Video) {
			return Math.random();
		}

		relatedTo(v2: Video): IVideos {
			this.queries.push((v) => (this.videoRelationScore(v, v2) > 0.5));
			return this;
		}

		live(isLive: boolean): IVideos {
			this.queries.push((v) => (v.type === VideoType.Live || v.type === VideoType.Stream));
			return this;
		}
		
		popular(views: number = 1000): IVideos {
			this.queries.push((v) => (v.views >= views));
			return this;
		}
		
		public(isPublic: boolean): IVideos {
			this.queries.push((v) => (v.access === VideoAccess.Public && v.status === VideoStatus.OnAir));
			return this;
		}
		
		by(author: User): IVideos {
			this.queries.push((v) => (v.author.email === author.email));
			return this;
		}

		get(): Video[] {
			return this.storage.filter(v => this.queries.reduce((ok, fq) => ok && fq(v), true));
		}
	}

	/**
	 * A modern age MySQL-backed repository.
	 */
	class VideosSQL implements IVideos{
		queries: string[] = [];

		save(v: Video) {
			//	INSERT INTO videos (id, title, type, ...) VALUES (...)
		}

		relatedTo(v2: Video): IVideos {
			this.queries.push(`#implement it somehow\n`);
			return this;
		}

		live(isLive: boolean): IVideos {
			this.queries.push(`videos.type = "live" || video.type = "stream"`);
			return this;
		}
		
		popular(views: number = 1000): IVideos {
			this.queries.push(`videos.views > ${views}`);
			return this;
		}
		
		public(isPublic: boolean): IVideos {
			this.queries.push(`videos.access = "public" && videos.status = "onair`);
			return this;
		}
		
		by(author: User): IVideos {
			this.queries.push(`author IN (SELECT id from users WHERE users.email="${author.email}")`);
			return this;
		}

		get(): Video[] {
			let query = this.queries.map(v => `(${v})`).join(' AND ');
			//	Execute the query and return the results
			return [];
		}
	}

	//#endregion

	///////////////////////////////////////////////////////////////////////////////////
	//	Now arm your [Client] business logic code with the repos and never worry anymore
	//	about changing storage engines, outdated DB schemas and ever growing complexity of queries.
	//#region

	function doVideoBusiness(videos: IVideos) {

		let aNicePussyVideo = {} as Video;

		//	The Popular Eugene's Videos Related To The Pussy Video
		let tpevrttpv = videos
			.by({email: 'eme@ciklum.com'})
			.popular(1000000)
			.relatedTo(aNicePussyVideo)
			;
		
		//	Make money from the Eugene's videos
	}

	doVideoBusiness(new VideosMemory);	//	Now your video business scales from a single server memory bank
	doVideoBusiness(new VideosSQL);		//	To unlimited cloud storages, effortlessly.

	//#endregion
}
